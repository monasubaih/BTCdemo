<!DOCTYPE html>
<html lang="en" class="error_page">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><?php echo $currentController->pageTitle ?></title>
        <?php
        deployClientFiles($currentController->css, true, false, 'css');
        foreach (glob(CSS_PATH . $currentController->controller . DS . $currentController->action . DS . "*.css") as $filename) {
            ?>
            <link rel="stylesheet" href="<?= mapFile2URL($filename); ?>" />
            <?php
        }
        ?>	
    </head>
    <body >

        <?php App::import($currentController->view, 'view'); ?>                                 
        <?php deployClientFiles($currentController->js, true, false, 'js'); ?>

    </body>
</html>