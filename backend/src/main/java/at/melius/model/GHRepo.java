package at.melius.model;

import jakarta.persistence.*;

@NamedQuery(name = GHRepo.QUERY_FIND_BY_PORTFOLIO, query = "SELECT r FROM GHRepo r WHERE portfolio = :portfolio")

@Entity
public class GHRepo {

    public static final String QUERY_FIND_BY_PORTFOLIO = "GHRepo.findByPortfolio";

    @Id
    @GeneratedValue
    private long id;

    private String url;

    private String username;

    private String repoName;

    private String description;

    private String language;

    @ManyToOne(fetch = FetchType.LAZY)
    private Portfolio portfolio;

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public long getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRepoName() {
        return repoName;
    }

    public void setRepoName(String repoName) {
        this.repoName = repoName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
