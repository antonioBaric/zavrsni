package hr.tvz.baric.zavrsni.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="VRSTA_USTANOVE")
public class VrstaUstanove {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="VRSTA_USTANOVE_ID", nullable = false)
	private Long id;
	
	@Column(name="NAZIV")
	private String naziv;
	
	public VrstaUstanove(){};

	public VrstaUstanove(String naziv) {
		super();
		this.naziv = naziv;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	
}
