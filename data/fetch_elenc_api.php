<?php
    $api_endpoints = [
        "beep1" => "https://www.elnec.com/get_devices.php?id=beep1",
        "beep2" => "https://www.elnec.com/get_devices.php?id=beep2",
        "beep3" => "https://www.elnec.com/get_devices.php?id=beep3"
    ];

    $results = [];

    // call every api endpoint and store the results
    foreach ($api_endpoints as $key => $url) {
        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($curl, CURLOPT_USERAGENT, 'Your User Agent');

        $response = curl_exec($curl);
        
        if ($response === false) {
            // error in response
            $error = curl_error($curl);
            $results[$key] = "error";
        } else {
            // Process the response
            if (preg_match('/<span[^>]*>(.*?)<\/span>/s', $response, $matches)) {
                $results[$key] = trim($matches[1]);
            } else {
                $results[$key] = "error";
            }
        }
        
        curl_close($curl);
    }

    $json_result = json_encode($results, JSON_PRETTY_PRINT);

    // store in file
    if (file_put_contents('elnec_api_data.json', $json_result)) {
        echo "Results saved to results_elnec_api.json\n";
    } else {
        echo "Error: Unable to save results to file results_elnec_api.json\n";
    }
?>