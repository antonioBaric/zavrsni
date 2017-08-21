package hr.tvz.baric.zavrsni.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="USTANOVA")
public class Ustanova {
	
	@Id
	@Column(name="USTANOVA_ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="IME")
	private String ime;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="VRSTA_USTANOVE", referencedColumnName="VRSTA_USTANOVE_ID")
	private VrstaUstanove vrstaUstanove;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="SPECIJALIZACIJA_USTANOVE", referencedColumnName="SPECIJALIZACIJA_USTANOVE_ID")
	private	SpecijalizacijaUstanove specijalizacijaUstanove;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="MJESTO", referencedColumnName="MJESTO_ID")
	private Mjesto mjesto;
	
	@Column(name = "ACTIVE")
	private Boolean active;
	
	@Column(name="ADRESA")
	private String adresa;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "ustanova", cascade = CascadeType.REMOVE)
	@JsonManagedReference
	private List<Odjel> odjeli;
	
	@Column(name="NASLOV")
	private String naslov;
	
	@Column(name="KRATKI_OPIS")
	private String kratkiOpis;
	
	@Column(name="SIRI_OPIS")
	private String siriOpis;
	
	@Column(name="TELEFON")
	private String telefon;
	
	@Column(name="EMAIL")
	private String email;
	
	@Column(name="SLIKA")
	private String slika;
	
	public Ustanova() {}

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

	public VrstaUstanove getVrstaUstanove() {
		return vrstaUstanove;
	}

	public void setVrstaUstanove(VrstaUstanove vrstaUstanove) {
		this.vrstaUstanove = vrstaUstanove;
	}

	public SpecijalizacijaUstanove getSpecijalizacijaUstanove() {
		return specijalizacijaUstanove;
	}

	public void setSpecijalizacijaUstanove(SpecijalizacijaUstanove specijalizacijaUstanove) {
		this.specijalizacijaUstanove = specijalizacijaUstanove;
	}

	public Mjesto getMjesto() {
		return mjesto;
	}

	public void setMjesto(Mjesto mjesto) {
		this.mjesto = mjesto;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getNaslov() {
		return naslov;
	}

	public void setNaslov(String naslov) {
		this.naslov = naslov;
	}

	public String getKratkiOpis() {
		return kratkiOpis;
	}

	public void setKratkiOpis(String kratkiOpis) {
		this.kratkiOpis = kratkiOpis;
	}

	public String getSiriOpis() {
		return siriOpis;
	}

	public void setSiriOpis(String siriOpis) {
		this.siriOpis = siriOpis;
	}

	public String getTelefon() {
		return telefon;
	}

	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSlika() {
		return slika;
	}

	public void setSlika(String slika) {
		this.slika = slika;
	}

	public List<Odjel> getOdjeli() {
		return odjeli;
	}

	public void setOdjeli(List<Odjel> odjeli) {
		this.odjeli = odjeli;
	};
	
	
	

}
