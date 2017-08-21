package hr.tvz.baric.zavrsni.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "PACIJENT")
public class Pacijent {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PACIJENT_ID")
	private Long id;
	
//	@OneToOne(fetch = FetchType.EAGER)
//	@JoinColumn(name = "USER_INFO", referencedColumnName = "USER_INFO_ID")
//	@JsonBackReference
//	private UserInfo userInfo;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "pacijent", cascade = CascadeType.REMOVE)
	@JsonManagedReference
	private List<PregledPacijenta> preglediPacijenta;
	
	@Column(name = "NESTO")
	private String nesto;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

//	public UserInfo getUserInfo() {
//		return userInfo;
//	}
//
//	public void setUserInfo(UserInfo userInfo) {
//		this.userInfo = userInfo;
//	}

	public String getNesto() {
		return nesto;
	}

	public void setNesto(String nesto) {
		this.nesto = nesto;
	}

	public List<PregledPacijenta> getPreglediPacijenta() {
		return preglediPacijenta;
	}

	public void setPreglediPacijenta(List<PregledPacijenta> preglediPacijenta) {
		this.preglediPacijenta = preglediPacijenta;
	}

	
	
}
