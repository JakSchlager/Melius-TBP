package at.melius.model;

import jakarta.persistence.*;

@Entity
public class KnownLanguage {

    @Id
    @GeneratedValue
    private int id;

    private String language;

    private int rating;

    @ManyToOne(fetch = FetchType.LAZY)
    private Portfolio portfolio;

    public int getId() {
        return id;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
