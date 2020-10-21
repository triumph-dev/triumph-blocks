<?php


function triumph_blocks_admin_assests() {
	wp_enqueue_style('triumph-blocks-admin-styles', TRIUMPH_BLOCKS_URL.'assets/admin.css');
}
add_action( 'admin_enqueue_scripts', 'triumph_blocks_admin_assests' );

function account_comparison($accounts = []){

	$account_comparison = [
		'accounts'=>$accounts,
		'rows'=>[],
	];
	$account_perks_obj = get_field_object('account_perks', $accounts[0]->ID);
	$account_fields = $account_perks_obj['sub_fields'];

	foreach($account_fields as $account_field){
		$account_comparison['rows'][] = $account_field;
	}

	foreach($accounts as $account){
		$account_perks_obj = get_field_object('account_perks', $account->ID);
		$account_perks = $account_perks_obj['value'];
		foreach($account_perks as $k=>$v){
			$key = array_search($k, array_column($account_comparison['rows'], 'name'));
			$account_comparison['rows'][$key]['values'][] = $v;
		}
	}
	
	return $account_comparison;
}




function acf_icon_selector_choices( $field ) {
    
    // reset choices
    $field['choices'] = array();


	$triumph_icon_path = dirname(__DIR__).'/templates/blocks/icons/svg/';
	$triumph_icon_url = TRIUMPH_BLOCKS_URL.'templates/blocks/icons/svg/';
    $dir = new DirectoryIterator($triumph_icon_path);
	$field['choices']['none'] = "None";
	foreach ($dir as $fileinfo) {
		
		if (!$fileinfo->isDot()) {
			$icon_img = '<img class="triumph-icon-img" src="'.$triumph_icon_url.$fileinfo->getFilename().'" />';
			//var_dump($fileinfo->getFilename());
			$field['choices'][$triumph_icon_url.$fileinfo->getFilename()] = $icon_img.'<div class="triumph-icon-title">'.$fileinfo->getFilename().'</div>';
		}
	}

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
	$opts = array(
		'ssl' => array(
			'verify_peer' => false,
			'verify_peer_name' => false,
			'allow_self_signed' => true
		)
	);

	$context = stream_context_create($opts);
	libxml_set_streams_context($context);
	
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