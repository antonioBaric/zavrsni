package hr.tvz.baric.zavrsni.model;

import java.util.List;

public class ExampleObject {
	
	private Integer broj;
	private String string;
	private List<String> polje;
	private String skriveno;
	
	public ExampleObject(Integer broj, String string, List<String> polje) {
		super();
		this.broj = broj;
		this.string = string;
		this.polje = polje;
		this.skriveno = "skriveno polje bez getera i setera";
	}

	public Integer getBroj() {
		return broj;
	}

	public void setBroj(Integer broj) {
		this.broj = broj;
	}

	public String getString() {
		return string;
	}

	public void setString(String string) {
		this.string = string;
	}

	public List<String> getPolje() {
		return polje;
	}

	public void setPolje(List<String> polje) {
		this.polje = polje;
	}
	
	

}
