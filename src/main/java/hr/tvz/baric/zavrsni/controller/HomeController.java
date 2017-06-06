package hr.tvz.baric.zavrsni.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/zavrsni")
public class HomeController {
	
	@GetMapping(value = "/")
	public String HomePage(){
		return "index";
	}

}
