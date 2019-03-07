<?php

/**
 * @package Helpdesk Plugin
 */

/**
Plugin Name: Helpdesk Plugin
Description: Plugin for problem creation and searching.
Version: 0.0.1
Author: Team 14
Author URI: https://github.com/Goregius/CMS-Team14
License: GPLv2 or later
Text Domain: helpdesk
*/

if (!defined('ABSPATH')) 
{
	die;
}

if (file_exists(dirname(__FILE__). '/vendor/autoload.php'))
{
	require_once dirname(__FILE__). '/vendor/autoload.php';
}

use Inc\Activate;
use Inc\Deactivate;
use Inc\Admin\AdminPages;

class HelpdeskPlugin
{
	public $plugin;

	function __construct() 
	{
		$this->plugin = plugin_basename( __FILE__ );
		add_action('init', array($this, 'create_problem_post'));
	}

	function register()
	{
		add_action( 'admin_enqueue_scripts', array($this, 'enqueue') );

		add_action('admin_menu', array($this, 'add_admin_pages'));

		add_filter("plugin_action_links_$this->plugin", array( $this, 'settings_link'));
	}

	function settings_link ($links)
	{

		$settings_link = "<a href='admin.php?page=helpdesk'>Settings</a>";
		array_push($links, $settings_link);
		return $links;
	}

	function add_admin_pages ()
	{
		add_menu_page( "Helpdesk Page", "Helpdesk", 'manage_options', "helpdesk", array($this, 'admin_index'), 'dashicons-desktop', 110 );
	}

	function admin_index()
	{
		require_once plugin_dir_path( __FILE__ ) . 'templates/admin.php';
	}

	function create_problem_post() 
	{
		register_post_type('problem', ['public'=>true, 'label'=>'Problems']);
	}

	function enqueue()
	{
		//enqueue all scripts
		wp_enqueue_style( 'helpdesk_style', plugins_url('/assets/style.css', __FILE__) );
		wp_enqueue_script( 'helpdesk_script', plugins_url('/assets/script.js', __FILE__) );
	}

	function activate()
	{
		Activate::activate();
	}

	function deactivate()
	{
		Deactivate::deactivate();
	}
}


// Set up plugin
$helpdeskPlugin = new HelpdeskPlugin();
$helpdeskPlugin->register();

// Activate plugin function
register_activation_hook(__FILE__, array($helpdeskPlugin, 'activate')); 

// Deactivate plugin function
register_deactivation_hook(__FILE__, array($helpdeskPlugin, 'deactivate')); 
