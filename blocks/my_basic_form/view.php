<?php
// Standard GPL and phpdocs
require_once('../../config.php');
//require_once($CFG->libdir.'/adminlib.php');
 
//admin_externalpage_setup('my_basic_form');
 
// Set up the page.
$title = get_string('pluginname', 'block_my_basic_form');
$pagetitle = $title;
$url = new moodle_url("/blocks/my_basic_form/view.php");
$PAGE->set_url($url);
$PAGE->set_title($title);
$PAGE->set_heading($title);
$PAGE->set_pagelayout('standard');
 
echo $OUTPUT->header();
echo $OUTPUT->heading($pagetitle);


echo create_form();
function create_form(){
    return '<form><input type="text"></input></form>';
}

echo $OUTPUT->footer();