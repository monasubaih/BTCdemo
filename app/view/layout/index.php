<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
  <meta name="description" content="bootstrap admin template">
  <meta name="author" content="">

  <title><?php echo $GLOBALS['registry']->pageTitle; ?></title>
      <script src="//code.jquery.com/jquery-1.7.2.js"></script>
      <script src="http://localhost/btcApi/app/js/lib/knockout-3.3.0.js"></script>
        <script src="http://code.highcharts.com/stock/highstock.js"></script>
        <script src="http://code.highcharts.com/modules/exporting.js"></script>
        <script src="http://localhost/btcApi/app/js/index/home/highchartsource.js"></script>
  
</head>
<body class="dashboard">
  <!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

  <!-- Page -->
<!-- Page -->
<div class="page animsition">
    <div class="page-header">
        <h1 class="page-title"><?php echo $GLOBALS['registry']->pageTitle; ?></h1>

    </div>  

          <!-- Widget Linearea Color -->
          <?php App::import($currentController->view, 'view'); ?>    
</div>
          <!-- End Widget Linepoint -->
  <!-- End Page -->

</body>

</html>