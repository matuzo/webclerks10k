<?php
  function resizeImage($file, $size, $crop) {

    try {
        $img = new abeautifulsite\SimpleImage($file);
        
        $img->fit_to_height($size);

        $width = ($img->get_width() - $size) / 2;
        $height = ($img->get_height() - $size) / 2;

        if($crop) {
          $img->crop($width, $height, $width + $size, $height + $size)->save($file);
      } else {
          $img->resize($width + $size, $height + $size)->save($file);
      }
    } catch(Exception $e) {
        echo 'Error: ' . $e->getMessage();
    }
  }

  function saveImage($file, $path, $size, $crop) {
    file_put_contents($file, $path);
    resizeImage($file, $size, $crop);
  }

  function getUserImage($twitter, $github, $email, $size = 150, $crop = true) {
    if(FETCHUSERIMAGES) {
      $profilePics = $_SERVER['DOCUMENT_ROOT'].'/content/files/images/profile_pics/';

      if($twitter === '') {

        if($github !== '') {
          $githubAPI = getGitHubUser($github);
          saveImage($profilePics.'/'.$size.'_'.$github.'.jpg', file_get_contents($githubAPI->avatar_url), $size, $crop);
          return '/content/files/images/profile_pics/'.$size.'_'.$github.'.jpg';
        } else {
          $gravatar = "http://www.gravatar.com/avatar/".md5(strtolower(trim($email)))."?d=mm";
          return $gravatar;
        }
      } else {
       
        $twitter_settings = array(
          'oauth_access_token' => "22161724-lw7uSNDgzxsqlpfvA0MVHKiK70SI862QYP8eU4R0V",
          'oauth_access_token_secret' => "KHaBGnUcJiJjVU6HC6Rmqf1OrE2QqqPBjN25tj2VmEdub",
          'consumer_key' => "u4EuUSXiwRM3t7FsVoPI2dSnF",
          'consumer_secret' => "0WNs2gn7mWmyQF1w2ckW9jX8ZYX4cIVMcLYx6TM9nIxzXHBPjv"
        );

        $twitter_url = 'https://api.twitter.com/1.1/users/show.json';
        $twitter_getfield = '?screen_name='.$twitter;
        $requestMethod = 'GET';

        $twitterAPI = new TwitterAPIExchange($twitter_settings);
        $twitter_user = json_decode($twitterAPI->setGetfield($twitter_getfield)
          ->buildOauth($twitter_url, $requestMethod)
          ->performRequest());

        saveImage($profilePics.'/'.$size.'_'.$twitter.'.jpg', file_get_contents(str_replace('_normal', '', $twitter_user->profile_image_url_https)), $size, $crop);

        return '/content/files/images/profile_pics/'.$size.'_'.$twitter.'.jpg';
      }

    } else {
      if($twitter === '') {
        if($github !== '') {
          return '/content/files/images/profile_pics/'.$size.'_'.$github.'.jpg';
        } else {        
          $gravatar = "http://www.gravatar.com/avatar/".md5(strtolower(trim($email)))."?d=mm";
          return $gravatar;
        }
        
      } else {
        return '/content/files/images/profile_pics/'.$size.'_'.$twitter.'.jpg';
      }
    }
  }

?>