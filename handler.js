'use strict';

const AWS = require('aws-sdk');
const costexplorer = new AWS.CostExplorer
const dateformat = require('dateformat');
const sns = new AWS.SNS;

module.exports.publishBillingNotification = async (event) => {
  
  let startdate = new Date();
  let enddate = new Date();
  startdate.setDate(1);
  enddate.setDate(1);
  enddate.setMonth(enddate.getMonth()+1)
  enddate.setDate(0);
  
  const params = {
    Granularity: 'MONTHLY',
    Metrics: [ 'UnblendedCost' ],
    GroupBy: [{
      Type: 'DIMENSION',
      Key: 'SERVICE',
    }],
    TimePeriod:{
      Start: dateformat(startdate, "yyyy-mm-dd"),
      End: dateformat(enddate, "yyyy-mm-dd"),
    }
  };
  
  let data = {};
  
  try{
    data = await costexplorer.getCostAndUsage(params).promise();
    let text = "DAILY REPORT OF AWS COST ";
    data.ResultsByTime.map(result => {
      text += 'Start:' + result.TimePeriod.Start + '，End:' + result.TimePeriod.End + "\n";
      result.Groups.map(group => {
        group.Keys.map(key => text += key.padStart(50) + ': ');
        text += '$' + group.Metrics.UnblendedCost.Amount + "\n";
      });
    })
    const sns_param = {
      TopicArn: process.env.SNS_TOPIC_ARN, 
      Message: text,      
    }
    console.log(text);
    let result = await sns.publish(sns_param).promise();
    
    
  }catch(err){
    console.error(err,err.stack);
    return {
    statusCode: 500,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      output: err,
    }, null, 2),
  };
  }
  
  
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      output: data,
    }, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
