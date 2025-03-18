package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Set;

@NamedQuery(name = Group.QUERY_FIND_ALL, query = "SELECT g FROM Group g")
@NamedQuery(name = Group.QUERY_FIND_BY_ID, query = "SELECT g FROM Group g WHERE id = :id")

@Entity
@Table(name="Groups")
public class Group {

    public static final String QUERY_FIND_ALL = "Groups.findAll";

    public static final String QUERY_FIND_BY_ID = "Groups.findById";

    @Id
    @GeneratedValue
    private int id;

    private String name;

    private String company;

    private String department;

    private String password;

    private int maxMembers;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="GroupMember",
            joinColumns = @JoinColumn(name="groups_id"),
            inverseJoinColumns = @JoinColumn(name="profile_id")
    )
    @JsonIgnoreProperties({"groups", "portfolio"})
    private Set<Profile> members;

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getMaxMembers() {
        return maxMembers;
    }

    public void setMaxMembers(int maxMembers) {
        this.maxMembers = maxMembers;
    }

    public Set<Profile> getMembers() {
        return members;
    }

    public void setMembers(Set<Profile> members) {
        this.members = members;
    }
}
