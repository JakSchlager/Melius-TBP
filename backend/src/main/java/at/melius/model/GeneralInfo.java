package at.melius.model;

import jakarta.persistence.*;

@Entity
public class GeneralInfo {

    @OneToOne
    @Id
    private User user;

    @Column(name="gender")
    private String gender;

    @Column(name="zip_code")
    private String zipCode;

    @Column(name="city")
    private String city;

    @Column(name="address")
    private String address;

    public User getProfile() {
        return user;
    }

    public String getGender() {
        return gender;
    }

    public String getZipCode() {
        return zipCode;
    }

    public String getCity() {
        return city;
    }

    public String getAddress() {
        return address;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
