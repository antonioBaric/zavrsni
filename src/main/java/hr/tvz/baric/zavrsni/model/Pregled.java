package hr.tvz.baric.zavrsni.model;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="PREGLED")
public class Pregled {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="PREGLED_ID", nullable = false)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="NAZIV_PREGLEDA", referencedColumnName="NAZIV_PREGLEDA_ID")
	private NazivPregleda nazivPregleda;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name="ODJEL", referencedColumnName = "ODJEL_ID")
	@JsonBackReference
	private Odjel odjel;
	
	@Column(name="OPIS")
	private String opis;
	
	@Column(name="DATUM")
	private Date datum;
	
	@Column(name="STATUS")
	private Boolean status;
	
	//STATUS, DATUM, VRIJEME...

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public NazivPregleda getNazivPregleda() {
		return nazivPregleda;
	}

	public void setNazivPregleda(NazivPregleda nazivPregleda) {
		this.nazivPregleda = nazivPregleda;
	}

	public Odjel getOdjel() {
		return odjel;
	}

	public void setOdjel(Odjel odjel) {
		this.odjel = odjel;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	
	
	
	

}
