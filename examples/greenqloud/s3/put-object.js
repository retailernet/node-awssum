var inspect = require('eyes').inspector();
var awssum = require('awssum');
var greenqloud = awssum.load('greenqloud/greenqloud');
var S3 = awssum.load('greenqloud/s3').S3;

var env             = process.env;
var accessKeyId     = env.GREENQLOUD_ACCESS_KEY_ID;
var secretAccessKey = env.GREENQLOUD_SECRET_ACCESS_KEY;
var awsAccountId    = env.GREENQLOUD_ACCOUNT_ID;

var s3 = new S3({
    'accessKeyId'     : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    // 'awsAccountId'    : awsAccountId, // optional
    'region'          : greenqloud.IS_1
});

console.log( 'Region          :', s3.region() );
console.log( 'EndPoint        :', s3.host() );
console.log( 'AccessKeyId     :', s3.accessKeyId() );
console.log( 'SecretAccessKey :', s3.secretAccessKey().substr(0, 3) + '...' );
console.log( 'AwsAccountId    :', s3.awsAccountId() );

// This is for strings. See put-object-streaming.js for a file example
var body = "Hello, World!\n";

var options = {
    BucketName    : 'pie-18',
    ObjectName    : 'test-object.txt',
    ContentLength : Buffer.byteLength(body),
    Body          : body,
};

s3.PutObject(options, function(err, data) {
    console.log("\nputting an object to pie-18 - expecting success");
    inspect(err, 'Error');
    inspect(data, 'Data');
});

var optionsWithSpace = {
    BucketName    : 'pie-18',
    ObjectName    : 'test object.txt',
    ContentLength : Buffer.byteLength(body),
    Body          : body,
};

s3.PutObject(optionsWithSpace, function(err, data) {
    console.log("\nputting an object with a space in it's name to pie-18 - expecting success");
    inspect(err, 'Error');
    inspect(data, 'Data');
});

var optionsWithMetaData = {
    BucketName    : 'pie-18',
    ObjectName    : 'test-object-with-metadata.txt',
    MetaData      : {
        'Username' : 'chilts',
        'UniqueId' : '629f3b9b-49bb-4d0b-b38b-21ad9b132e90'
    },
    ContentLength : Buffer.byteLength(body),
    Body          : body,
};

s3.PutObject(optionsWithMetaData, function(err, data) {
    console.log("\nputting an object with metadata to pie-18 - expecting success");
    inspect(err, 'Error');
    inspect(data, 'Data');
});

var optionsWithCacheControl = {
    BucketName    : 'pie-18',
    ObjectName    : 'test-cache.txt',
    ContentLength : Buffer.byteLength(body),
    Body          : body,
    CacheControl  : 'max-age=3600'
};

s3.PutObject(optionsWithCacheControl, function(err, data) {
    console.log("\nputting an object with cache-control to pie-18 - expecting success");
    inspect(err, 'Error');
    inspect(data, 'Data');
});
