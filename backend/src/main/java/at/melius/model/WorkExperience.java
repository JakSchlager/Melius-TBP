package at.melius.model;
import jakarta.persistence.*;
import org.hibernate.jdbc.Work;
import java.util.Date;
@Entity
public class WorkExperience {
    @Id
    @GeneratedValue
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Portfolio portfolio;
    @Column(name="company")
    private String company;
    @Column(name="from_date")
    private Date fromDate;
    @Column(name="to_date")
    private Date toDate;
    @Column(name="information")
    private String information;
    public int getId() {
        return id;
    }
    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
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
    public String getInformation() {
        return information;
    }
    public void setInformation(String information) {
        this.information = information;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }
}