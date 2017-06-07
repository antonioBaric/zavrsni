package hr.tvz.baric.zavrsni.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="example")
public class Example {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="ime")
	private String ime;
	
	@Column(name="broj")
	private Integer broj;
	
	@Column(name="opis")
	private String opis;
	
	public Example(){};

	public Example(String ime, Integer broj, String opis) {
		super();
		this.ime = ime;
		this.broj = broj;
		this.opis = opis;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public Integer getBroj() {
		return broj;
	}

	public void setBroj(Integer broj) {
		this.broj = broj;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}
	
	

}
