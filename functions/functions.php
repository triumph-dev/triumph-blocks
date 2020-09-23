<?php


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