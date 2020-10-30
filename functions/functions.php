<?php

function triumph_blocks_categories( $categories ) {
	$category_slugs = wp_list_pluck( $categories, 'slug' );
	return in_array( 'triumph-blocks', $category_slugs, true ) ? $categories : array_merge(
		$categories,
		array(
			array(
				'slug'  => 'triumph-blocks',
				'title' => __( 'Triumph Blocks', 'triumph-blocks' ),
				'icon'  => null,
            ),
        )
    );
}
add_filter( 'block_categories', 'triumph_blocks_categories' );


function triumph_blocks_admin_assests() {
	wp_enqueue_style('triumph-blocks-admin-styles', TRIUMPH_BLOCKS_URL.'assets/admin.css');
}
add_action( 'admin_enqueue_scripts', 'triumph_blocks_admin_assests' );

function account_comparison($accounts = []){

	$account_comparison = [
		'accounts'=>$accounts,
		'rows'=>[],
	];
	$account_features_obj = get_field_object('account_features', $accounts[0]->ID);
	$account_fields = $account_features_obj['sub_fields'];

	foreach($account_fields as $account_field){
		$account_comparison['rows'][] = $account_field;
	}

	foreach($accounts as $account){
		$account_features_obj = get_field_object('account_features', $account->ID);
		$account_features = $account_features_obj['value'];
		foreach($account_features as $k=>$v){
			$key = array_search($k, array_column($account_comparison['rows'], 'name'));
			$account_comparison['rows'][$key]['values'][] = $v;
		}
	}
	
	return $account_comparison;
}



function account_features( $account_id = null) {
	
	if($account_id && get_field('account_features', $account_id)){
		$account_features = get_field('account_features', $account_id);

		$account_features_obj = get_field_object('account_features', $account_id);

		$account_feature_fields = $account_features_obj['sub_fields'];

		$list_content = [];
		$disclaimer = '';
		$i = 1;
		foreach($account_features as $feature_name => $feature_value){
			$key = array_search($feature_name, array_column($account_feature_fields, 'name'));

			$feature_title = $account_feature_fields[$key]['label'];
			
			if(is_bool($feature_value) && $feature_value == true ){
				$feature_value = '<i class="far fa-check"></i>';
			}

			if(!empty($account_feature_fields[$key]['instructions'])){
				$feature_value .= '<sup>'.$i.'</sup>';
				$disclaimer .= ' '.$i.'. '.$account_feature_fields[$key]['instructions'];
				$i++;
			}
			$list_content[] = sprintf(
				'<span class="title">%s:</span> %s',
			$feature_title, $feature_value);
			
		}
		
		$output = ['features'=>$list_content, 'disclaimer'=>$disclaimer];
	}else{
		$output = null;
	}
	return $output;
}




function acf_icon_selector_choices( $field ) {
    
    // reset choices
    $field['choices'] = array();


	$triumph_icon_path = dirname(__DIR__).'/templates/blocks/icons/svg/';
	$triumph_icon_url = TRIUMPH_BLOCKS_URL.'templates/blocks/icons/svg/';
    $dir = new DirectoryIterator($triumph_icon_path);
	
	foreach ($dir as $fileinfo) {
		if(strpos ( $fileinfo->getFilename() , '.svg' ) !== false){
			if (!$fileinfo->isDot()) {
				$icon_img = '<img class="triumph-icon-img" src="'.$triumph_icon_url.$fileinfo->getFilename().'" />';
				$title = basename($fileinfo->getFilename(), '.svg');
				$field['choices'][$triumph_icon_url.$fileinfo->getFilename()] = $icon_img.'<div class="triumph-icon-title">'.$title.'</div>';
			}
		}
	}
	//$none=['none'=>'None'];
	ksort($field['choices']);
	//array_unshift ( $field['choices'], $field['choices'][$none] );
    // return the field
    return $field;
    
}

add_filter('acf/load_field/name=icon', 'acf_icon_selector_choices');


/**
 * Get an SVG by path or URL, and returns the SVG code
 *  instead of the image
 *
 * @param string $file_location The path or url to an SVG file
 */
function svg_code($file_location = null){
	if(WP_DEBUG){
		$opts = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,

			)
		);

		$context = stream_context_create($opts);
		libxml_set_streams_context($context);
	}

	
    $return = false;
    if ($file_location) {
		
        $iconfile = new DOMDocument();
        $iconfile->load($file_location);
        $html = $iconfile->saveHTML($iconfile->getElementsByTagName('svg')[0]);
		if(strpos($html, 'class="triumph-svg-icon"') !== false){
			$html = str_replace ( '#000000', get_theme_mod('triumph_color_secondary', '#005000'), $html);
			$html = str_replace ( '#c8c9c7', get_theme_mod('triumph_color_accent', '#c8c9c7'),  $html);
		}
		$return = $html;
    }
    return $return;
}


function add_list_js(){
	// Include List.js
	wp_enqueue_script( "list.js", "https://cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js", [], false, true );
}