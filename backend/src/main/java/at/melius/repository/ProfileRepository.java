package at.melius.repository;

import at.melius.model.Profile;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ProfileRepository {
    @Inject
    EntityManager entityManager;

    public List<Profile> getAllProfiles() {
        return this.entityManager.createNamedQuery(Profile.QUERY_FIND_ALL, Profile.class).getResultList();
    }

    @Transactional
    public Profile addProfile(Profile profile) {
        if(getProfileByEmail(profile.getEmail()) == null) {
            this.entityManager.persist(profile);
            return profile;
        }

        return null;
    }

    public Profile getProfileByEmail(String email) {
        List<Profile> profiles = getAllProfiles();

        for(Profile currProfile: profiles) {
            if(currProfile.getEmail().equals(email)) {
                return currProfile;
            }
        }

        return null;
    }

}
