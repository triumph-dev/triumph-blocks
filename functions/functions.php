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




function triumph_blocks_update_field_group($group) {
	if ( strpos($group['title'], 'Block - ') !== false ||  
		strpos($group['title'], 'Blocks - ') !== false ||
		strpos($group['title'], 'Triumph - ') !== false)
		{
	  add_filter('acf/settings/save_json', function() {
		return TRIUMPH_BLOCKS_DIR.'assets/acf-json';
	  });
	}
  }
add_action('acf/update_field_group', 'triumph_blocks_update_field_group', 1, 1);


add_filter('acf/settings/load_json', 'my_acf_json_load_point');

function my_acf_json_load_point( $paths ) {
    
    // remove original path (optional)
    // unset($paths[0]);
	$path = TRIUMPH_BLOCKS_DIR.'assets/acf-json';
    
    // append path
    $paths[] = $path;
    
    // return
    return $paths;
    
}



add_filter( 'timber/acf-gutenberg-blocks-data', function( $context ){
    $context['post'] = Timber::get_post();

    return $context;
} );


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
			

			if(!empty($feature_value)){

				if(!is_bool($feature_value)){
					$feature_value = ': '.$feature_value;
				}

				if(is_bool($feature_value) && $feature_value == true ){
					$feature_value = '';
				}

				if(!empty($account_feature_fields[$key]['instructions'])){
					$feature_value .= '<sup>'.$i.'</sup>';
					$disclaimer .= ' '.$i.'. '.$account_feature_fields[$key]['instructions'];
					$i++;
				}

				$list_content[] = sprintf('<span class="title">%s</span>%s', $feature_title, $feature_value);

			}

		}
		
		$output = ['features'=>$list_content, 'disclaimer'=>$disclaimer];
	}else{
		$output = null;
	}
	return $output;
}


function triumph_faq_categories($faqs){
	$categories = [];
	foreach($faqs as $faq){
		$question_categories = array_map('trim', explode(',', $faq['category'])); 
		$categories = array_merge ($categories, $question_categories);
	}
	$categories = array_filter(array_unique ($categories));
	return $categories;

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

function triumph_get_accent_color(){
	if(!empty(get_the_ID())){
		$url = get_permalink(get_the_ID());
		$base = get_site_url();

		if(strpos($url, $base.'/personal') !== false){
			$accent_color = get_theme_mod('triumph_color_accent_green', '#527a2e');
		}elseif(strpos($url, $base.'/business') !== false){
			$accent_color = get_theme_mod('triumph_color_accent_blue', '#4F758B');
		}
		elseif(strpos($url, $base.'/our-bank') !== false){
			$accent_color = get_theme_mod('triumph_color_accent_rust', '#B35D23');
		}else{
			$accent_color = get_theme_mod('triumph_color_accent', '#37474f');
		}

	}else{
		$accent_color = get_theme_mod('triumph_color_accent', '#37474f');
	}
	return $accent_color;
}


/**
 * Get an SVG by path or URL, and returns the SVG code
 *  instead of the image
 *
 * @param string $file_location The path or url to an SVG file
 */
function svg_code($file_location = null){


	if(function_exists('triumph_get_primary_color')){
		$icon_accent = adjust_brightness(triumph_get_primary_color(), 20);
		
	}elseif(get_theme_mod('triumph_color_accent_icon')){
		$icon_accent = get_theme_mod('triumph_color_accent_icon', '#37474f');
	}else{
		$icon_accent = get_theme_mod('triumph_color_accent', '#37474f');
	}

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
    	if (strpos($file_location, '/vendor/triumph-dev/triumph-blocks/templates/blocks/icons/svg/') !== false) {
		    $file_location = dirname(__DIR__).'/templates/blocks/icons/svg/'. array_pop(explode('/', $file_location));
		}
        $iconfile = new DOMDocument();
        $iconfile->load($file_location);
        $html = $iconfile->saveHTML($iconfile->getElementsByTagName('svg')[0]);
		if(strpos($html, 'class="triumph-svg-icon"') !== false){
			$html = str_replace ( '#000000', get_theme_mod('triumph_color_secondary', '#005000'), $html);
			$html = str_replace ( '#c8c9c7', $icon_accent,  $html);
		}
		$return = $html;
    }
    return $return;
}


function add_list_js(){
	// Include List.js
	if(!wp_script_is( 'list.js', 'enqueued' )){
		wp_enqueue_script( 'list.js', 'https://cdnjs.cloudflare.com/ajax/libs/list.js/2.3.1/list.min.js', [], false, true );
	}
	
}


function triumph_breadcrumbs() {

    $baseurl = get_site_url();
    $current_url = get_permalink();
    $uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $segments = array_filter(explode('/', $uri_path));
    $crumbs = '<li><a href="/">Home</a></li>';
    $i = 1;
    foreach($segments as $segment){
        $path_segments = array_slice($segments, 0, $i);
        implode('/', $path_segments);
        $path = '/'.implode('/', $path_segments).'/';
        $post_url = rtrim($baseurl,'/').$path;
        $id = url_to_postid($post_url);
        $title = get_the_title($id);
        
        if( !next( $segments ) ) {
            $crumbs .= '<li>'.$title.'</li>';
        }else{
            $crumbs .= '<li><a href="'.$path.'">'.$title.'</a></li>';
        }
        $i++;
    }
    return '<ul class="breadcrumb-links">'.$crumbs.'</ul>';
}



