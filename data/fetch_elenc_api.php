<?php
    $api_endpoints = [
        "beep2_devices" => "https://www.elnec.com/get_devices.php?id=beep2",
        "beep2_manufacturers" => "https://www.elnec.com/get_manufacturers.php?id=beep2",
        "beep2c_devices" => "https://www.elnec.com/get_devices.php?id=beep2c",
        "beep2c_manufacturers" => "https://www.elnec.com/get_manufacturers.php?id=beep2c",
        "beep3_devices" => "https://www.elnec.com/get_devices.php?id=beep3", 
        "beep3_manufacturers" => "https://www.elnec.com/get_manufacturers.php?id=beep3",
        "beeh304_devices" => "https://www.elnec.com/get_devices.php?id=beeh304",
        "beeh304_manufacturers" => "https://www.elnec.com/get_manufacturers.php?id=beeh304",
        "beeh204_devices" => "https://www.elnec.com/get_devices.php?id=beeh204",
        "beeh204_manufacturers" => "https://www.elnec.com/get_manufacturers.php?id=beeh204",
        "beeh204ap_devices" => "https://www.elnec.com/get_devices.php?id=beeh204ap",
        "beeh204ap_manufacturers" => "https://www.elnec.com/get_manufacturers.php?id=beeh204ap",
        "beeh208s_devices" => "https://www.elnec.com/get_devices.php?id=beeh208s",
        "beeh208s_manufacturers" => "https://www.elnec.com/get_manufacturers.php?id=beeh208s",
        "pg4uw_version" => "https://www.elnec.com/get_pg4uw_info2.php?id=version",
        "pg4uw_date" => "https://www.elnec.com/get_pg4uw_info2.php?id=sw_date",
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
    if (file_put_contents('results_elnec_api.json', $json_result)) {
        echo "Results saved to results_elnec_api.json\n";
    } else {
        echo "Error: Unable to save results to file results_elnec_api.json\n";
    }
?>