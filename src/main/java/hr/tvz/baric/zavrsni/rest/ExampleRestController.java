package hr.tvz.baric.zavrsni.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import hr.tvz.baric.zavrsni.model.Example;
import hr.tvz.baric.zavrsni.model.ExampleObject;
import hr.tvz.baric.zavrsni.repo.ExampleJpaRepo;

@RestController
@RequestMapping("/api/example")
public class ExampleRestController {
	
	@Autowired
	ExampleJpaRepo exampleJpaRepo;
	
	@GetMapping("/mapa")
	public Map<String,Object> mapa() {
	    Map<String,Object> model = new HashMap<String,Object>();
	    model.put("id", "5");
	    model.put("content", "Hello World");
	    return model;
	  }
	
	@GetMapping("/string")
	public String string() {
		String string = "ovo je neki string";
		Gson gson = new Gson();
		String json = gson.toJson(string);
		return json;
	}
	
	@GetMapping("/broj")
	public Integer broj() {
		Integer broj = 5;
		return broj;
	}
	
	@GetMapping("/polje")
	public List<Integer> polje() {
		List<Integer> polje = new ArrayList<>();
		polje.add(1);
		polje.add(2);
		polje.add(3);
		return polje;
	}
	
	@GetMapping("/objekt")
	public ExampleObject objekt() {
		Integer broj = 4;
		String string = "string u objektu";
		List<String> polje = new ArrayList<>();
		polje.add("jedan");
		polje.add("dva");
		ExampleObject objekt = new ExampleObject(broj, string, polje);
		return objekt;
	}
	
	@GetMapping("/exampleDb")
	public List<Example> getAllExample(){
		List<Example> examples = exampleJpaRepo.findAll();
		return examples;
	}
	
	@GetMapping("/exampleDb/{ime}")
	public Example getExampleByIme(@PathVariable String ime){
		return exampleJpaRepo.findByIme(ime);
	}
	
	@PutMapping("/exampleDb/{id}")
	public Example updateExample(@RequestBody Example example, @PathVariable Long id) {
		example.setId(id);
		return exampleJpaRepo.saveAndFlush(example);
	}
	
	@PostMapping("exampleDb")
	public Example insertExample(@RequestBody Example example) {
		example.setId(null);
		return exampleJpaRepo.saveAndFlush(example);
	}
	
	@DeleteMapping("exampleDb/{id}")
	public void deleteExample(@PathVariable Long id) {
		if (exampleJpaRepo.findById(id) != null) {
			exampleJpaRepo.delete(id);
		}
		
	}

}
