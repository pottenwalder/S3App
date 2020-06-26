<?php

namespace App\Controllers;

use Core\Controller;

require 'vendor/autoload.php';

use Aws\Sdk;
use Aws\S3\S3Client;
use Aws\Exception\AwsException;
use Aws\S3\Exception\S3Exception;

class Index extends Controller
{

    function __construct()
    {
        parent::__construct();

    }

    public function Main($params = array())
    {

        $this->view->setValues(array(
            0 => '{{Host}}'
        ), array(
            0 => HOST
        ));

        return $this->view->setView(
            array(
                'View.Header',
                'Home/View.Body',
                'View.Footer'
            )
        );
    }

    public function S3Upload()
    {

        $key = 'AKIAJ4Y2DBHHD2JADWQQ';
        $secret = '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';


        // Use the region and latest version of each client.
        $sharedConfig = [
            'region' => 'us-west-2',
            'version' => 'latest',
            'credentials' => [
                'key' => $key,
                'secret' => $secret,
            ]
        ];

        // Create an SDK class used to share configuration across clients.
        $sdk = new Sdk($sharedConfig);

        // Use an Aws\Sdk class to create the S3Client object.
        $s3Client = $sdk->createS3();

        // Send a PutObject request and get the result object.
        $result = $s3Client->putObject([
            'Bucket' => 'n301',
            'Key' => '' . $_POST['fileName'],
            'Body' => base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $_POST['Image'])),
            'ACL' => 'public-read'
        ]);

        // Print the body of the result by indexing into the result object.
        return 'Save';

    }

    function getS3Files()
    {
        $bucket = 'n301-resized';
        $std = new \stdClass();
        $std->array_key = array();

        $key = 'AKIAJ4Y2DBHHD2JADWQQ';
        $secret = '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';

        // Instantiate the client.
        $s3 = new S3Client([
            'version' => 'latest',
            'region' => 'us-west-2',
            'credentials' => [
                'key' => $key,
                'secret' => $secret,
            ]
        ]);

        // Use the high-level iterators (returns ALL of your objects).
        try {
            $results = $s3->getPaginator('ListObjects', [
                'Bucket' => $bucket
            ]);

            foreach ($results as $result) {
                foreach ($result['Contents'] as $object) {
                    array_push($std->array_key, "" . $object['Key'] . PHP_EOL . "");
                }
            }
        } catch (S3Exception $e) {
            $std->msg = $e->getMessage() . PHP_EOL;
        }

        return json_encode($std);

    }

}