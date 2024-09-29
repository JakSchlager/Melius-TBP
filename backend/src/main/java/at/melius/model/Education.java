package at.melius.model;

import jakarta.persistence.*;

import java.util.Date;

@NamedQuery(name= Education.GET_BY_PROFILE_ID, query = "Select e from Education e where user = :profile")

@Entity
public class Education {

    public static final String GET_BY_PROFILE_ID = "Education.findByProfile";

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    private User user;

    @Column(name="name")
    private String name;

    @Column(name="from_date")
    private Date fromDate;

    @Column(name="to_date")
    private Date toDate;

    @Column(name="finished")
    private String finished;

    public int getId() {
        return id;
    }

    public User getProfile() {
        return user;
    }

    public void setProfile(User user) {
        this.user = user;
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
