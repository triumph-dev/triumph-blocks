<?php
/**
 * Check whether WordPress and ACF are available; bail if not.
 *
 * @package triumph-blocks
 **/

//use DirectoryIterator;
//use FilesystemIterator;
//use RecursiveDirectoryIterator;
use Timber\Timber;

if ( ! function_exists( 'acf_register_block' ) ) {
	return;
}
if ( ! function_exists( 'add_filter' ) ) {
	return;
}
if ( ! function_exists( 'add_action' ) ) {
	return;
}
