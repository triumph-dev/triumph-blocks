<?php
/**
 * Check whether WordPress and ACF are available; bail if not.
 *
 * @package triumph-blocks
 **/

use Timber\Timber;

define('TRIUMPH_BLOCKS_URL', get_template_directory_uri().'/vendor/triumph-dev/triumph-blocks/');
define('TRIUMPH_BLOCKS_DIR', get_stylesheet_directory() . '/vendor/triumph-dev/triumph-blocks/');


if ( ! function_exists( 'acf_register_block' ) ) {
	return;
}
if ( ! function_exists( 'add_filter' ) ) {
	return;
}
if ( ! function_exists( 'add_action' ) ) {
	return;
}
//require_once 'functions/fields.php';
require_once 'functions/functions.php';

add_filter( 'timber/acf-gutenberg-blocks-templates', function( $context ){
	return [ 'vendor/triumph-dev/triumph-blocks/templates/blocks' ];
} );

add_action(
	'acf/init',
	function () {

	//die();
    if (is_array(Timber::$dirname)) {
        $views = Timber::$dirname;
    } else {
        $views = array(Timber::$dirname);
    }
    $views[] = 'vendor/triumph-dev/triumph-blocks';
	$views[] = 'vendor/triumph-dev/triumph-blocks/templates';
    Timber::$dirname = $views;
});