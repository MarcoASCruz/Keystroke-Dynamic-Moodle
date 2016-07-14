<?php
 
function xmldb_block_my_basic_form_upgrade($oldversion) {
    global $CFG;
 
    $result = TRUE;
 

if ($oldversion < 2016070611) {

        // Define field flag to be added to block_my_basic_form.
        $table = new xmldb_table('block_my_basic_form');
        $field = new xmldb_field('flag', XMLDB_TYPE_BINARY, null, null, null, null, null, 'title');

        // Conditionally launch add field flag.
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        // My_basic_form savepoint reached.
        upgrade_block_savepoint(true, 2016070611, 'my_basic_form');
    }
    
    return $result;
}