package at.melius.model;

import jakarta.persistence.*;

import java.util.Date;

@NamedQuery(name= Education.GET_BY_PROFILE_ID, query = "Select e from Education e where profile = :id")

@Entity
public class Education {

    public static final String GET_BY_PROFILE_ID = "Education.findByProfile";

    @Id
    @GeneratedValue
    int id;

    @ManyToOne
    Profile profile;

    @Column(name="name")
    String name;

    @Column(name="from_date")
    Date fromDate;

    @Column(name="to_date")
    Date toDate;

    @Column(name="finished")
    String finished;

    public int getId() {
        return id;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public String getFinished() {
        return finished;
    }

    public void setFinished(String finished) {
        this.finished = finished;
    }
}
