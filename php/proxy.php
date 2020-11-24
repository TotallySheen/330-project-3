<?php
	$BASE_URL ="https://jobs.github.com/positions.json?";
    ini_set("memory_limit",-1);
    // bail out if we don't have a term or location parameter
    if(!array_key_exists('term',$_REQUEST) && (!array_key_exists('location',$_REQUEST))){
        echo "<strong>You need both a <em>term</em> and a <em>location</em> parameter!</strong>";
            // This shuts down the current php script
        exit(); //You can also call die() - according to the PHP spec they are identical
    
    } else {
        //$_REQUEST is an associative array built into PHP that contains the web request
        // print_r($_REQUEST); // use for debugging to see what the `term` and `location` are
        // This will have all of the values from the request and information about the request
        //$term = $_REQUEST['term'];
        $location = $_REQUEST['location'];
        
        // encode spaces in the parameters as +
        //$term = str_replace(' ', '+', $term);
        $location = str_replace(' ', '+', $location);
        $url = $BASE_URL . /*"term=$term&*/"location=$location";

        
        
        // set up our authorization headers to send the API key
        $headers = stream_context_create(array(
            'http' => array(
            'method' => 'GET',
            'header' => "Accept: application/json\r\n"
                )
                ));
        
        
        $filedata = file_get_contents($url,false,$headers);
        
        // send a content-type header for the response so that the client browser will understand what is coming back
        header("content-type: application/json");
        header("Access-Control-Allow-Origin: *");
            
        // echo the content from the downloaded file
        echo $filedata;
    }


/*
    DOCS:
    http://php.net/manual/en/function.ini-set.php
    http://php.net/manual/en/ini.core.php#ini.memory-limit
    http://php.net/manual/en/reserved.variables.request.php
    http://php.net/manual/en/function.array-key-exists.php
    http://php.net/manual/en/function.print-r.php
    http://php.net/manual/en/language.operators.string.php
        http://php.net/manual/en/function.str-replace.php
    http://php.net/manual/en/function.exit.php
    http://php.net/manual/en/function.die.php
    http://php.net/manual/en/function.stream-context-create.php
    http://php.net/manual/en/function.file-get-contents.php
    http://php.net/manual/en/function.echo.php
*/
?>