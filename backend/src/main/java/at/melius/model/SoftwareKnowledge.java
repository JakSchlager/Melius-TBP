package at.melius.model;

import jakarta.persistence.*;

@Entity
public class SoftwareKnowledge {

    @Id
    @GeneratedValue
    private int id;

    private int rating;

    @ManyToOne
    private Software software;

    public int getId() {
        return id;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    private Portfolio portfolio;

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Software getSoftware() {
        return software;
    }

    public void setSoftware(Software software) {
        this.software = software;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }
}
