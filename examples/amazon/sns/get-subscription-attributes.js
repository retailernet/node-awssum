var inspect = require('eyes').inspector();
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var Sns = awssum.load('amazon/sns').Sns;

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var sns = new Sns({
    'accessKeyId'     : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    // 'awsAccountId'    : awsAccountId, // optional
    'region'          : amazon.US_EAST_1
});

console.log( 'Region :', sns.region() );
console.log( 'EndPoint :',  sns.host() );
console.log( 'AccessKeyId :', sns.accessKeyId() );
console.log( 'SecretAccessKey :', sns.secretAccessKey().substr(0, 3) + '...' );
console.log( 'AwsAccountId :', sns.awsAccountId() );

// firstly, get all of the subscriptions
sns.ListSubscriptions(function(err, data) {
    console.log("\nlisting all subscriptions - expecting success");
    inspect(err, 'Error');
    inspect(data, 'Data');

    // now call the GetSubscriptionAttributes()
    if ( ! err ) {
        var subscriptions = data.Body.ListSubscriptionsResponse.ListSubscriptionsResult.Subscriptions.member;
        var subscriptionArn = subscriptions[0].SubscriptionArn;
        sns.GetSubscriptionAttributes({ 'SubscriptionArn' : subscriptionArn }, function(err, data) {
            console.log("\nGetSubscriptionAttributes - expecting success");
            inspect(err, 'Error');
            inspect(data, 'Data');
        });
    }

});
