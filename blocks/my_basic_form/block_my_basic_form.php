<?php
class block_my_basic_form extends block_base {
    public function init() {
        $this->title = get_string('pluginname', 'block_my_basic_form');
    }
    
    public function get_content() {
        if ($this->content !== null) {
          return $this->content;
        }

        $this->content         =  new stdClass;
        $this->content->text   = $this->create_menu();
        

        return $this->content;
    }
    
    private function create_menu(){
        $form_url = new moodle_url('/blocks/my_basic_form/view.php');
        return html_writer::link($form_url, "The form");
    }
}