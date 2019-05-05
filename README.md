aws-billing-notification
========================

Description
-----------
 This applicaion nofify your aws cost with email every day on 0:00 AM (UTC).


Quick install
-------------
1. You have set your account to allow IAM and federated users to access billing information on your root account with the following url.
    * https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/grantaccess.html
2. You have to install and configure awscli as following url. 
    * https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
    * The IAM user you use for deploying should be set AdminAccessPolicy.
3. Pull the repository and change directory to `aws-billing-notification`
    * `git clone https://github.com/j-tanaka/aws-billing-notification.git`
4. Setup your email address for notifing the aws cost.
    * `echo "email: [your email address]" > serverless_config.yml`
    * for example, `echo "email: mail@example.net" > serverless_config.yml`
5. Install the dependencies
    * `npm install`
6. Deploy aws-billing-notification to your aws account.
    * `npm run deploy`
7. Activate SNS subscription as you received email from AWS.
8. Test aws-billing-notification
    * `npm run prod`


