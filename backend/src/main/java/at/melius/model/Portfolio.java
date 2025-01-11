package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.jboss.resteasy.spi.touri.MappedBy;

import java.util.Set;

@Entity
public class Portfolio {

    @Id
    @OneToOne
    @JoinColumn(name="profile_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"portfolio"}, allowSetters = true)
    private Profile profile;

    @OneToOne
    @JoinColumn(name="generalInfo_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"portfolio"}, allowSetters = true)
    private GeneralInfo generalInfo;

    

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<Education> educations;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<WorkExperience> workExperiences;

    @ManyToMany
    @JoinTable(
            name="portfolio_characteristic",
            joinColumns = @JoinColumn(name="portfolio_id"),
            inverseJoinColumns = @JoinColumn(name="characteristic_id")
    )
    @JsonIgnoreProperties({"portfolio"})
    private Set<Characteristic> characteristics;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<KnownLanguage> knownLanguages;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<ProgrammingKnowledge> programmingKnowledges;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<SoftwareKnowledge> softwareKnowledges;

    public Set<Characteristic> getCharacteristics() {
        return characteristics;
    }

    public void setCharacteristics(Set<Characteristic> characteristics) {
        this.characteristics = characteristics;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public GeneralInfo getGeneralInfo() {
        return generalInfo;
    }

    public void setGeneralInfo(GeneralInfo generalInfo) {
        this.generalInfo = generalInfo;
    }

    public Set<Education> getEducations() {
        return educations;
    }

    public void setEducations(Set<Education> educations) {
        this.educations = educations;
    }

    public Set<WorkExperience> getWorkExperiences() {
        return workExperiences;
    }

    public void setWorkExperiences(Set<WorkExperience> workExperiences) {
        this.workExperiences = workExperiences;
    }

    public Set<KnownLanguage> getKnownLanguages() {
        return knownLanguages;
    }

    public void setKnownLanguages(Set<KnownLanguage> knownLanguages) {
        this.knownLanguages = knownLanguages;
    }

    public Set<ProgrammingKnowledge> getProgrammingKnowledges() {
        return programmingKnowledges;
    }

    public void setProgrammingKnowledges(Set<ProgrammingKnowledge> programmingKnowledges) {
        this.programmingKnowledges = programmingKnowledges;
    }

    public Set<SoftwareKnowledge> getSoftwareKnowledges() {
        return softwareKnowledges;
    }

    public void setSoftwareKnowledges(Set<SoftwareKnowledge> softwareKnowledges) {
        this.softwareKnowledges = softwareKnowledges;
    }
}
