package hr.tvz.baric.zavrsni.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="NAZIV_ODJELA")
public class NazivOdjela {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="NAZIV_ODJELA_ID", nullable = false)
	private Long id;
	
	@Column(name="NAZIV")
	private String naziv;
	
	@Column(name="OPIS")
	private String opis;
	
	@Column(name="kratica")
	private String kratica;
	
	public NazivOdjela() {}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public String getKratica() {
		return kratica;
	}

	public void setKratica(String kratica) {
		this.kratica = kratica;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	};
	
	

}
