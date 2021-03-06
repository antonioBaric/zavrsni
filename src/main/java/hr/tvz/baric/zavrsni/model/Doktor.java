package hr.tvz.baric.zavrsni.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "DOKTOR")
public class Doktor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DOKTOR_ID")
	private Long id;

//	@OneToOne(fetch = FetchType.EAGER)
//	@JoinColumn(name = "USER_INFO", referencedColumnName = "USER_INFO_ID")
//	@JsonBackReference
//	private UserInfo userInfo;
	
	@Column(name = "TITULA")
	private String titula;

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

	public String getTitula() {
		return titula;
	}

	public void setTitula(String titula) {
		this.titula = titula;
	}

	

}
