package at.melius.repository;

import at.melius.model.GeneralInfo;
import at.melius.model.Profile;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

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

        throw new BadRequestException();
    }

    @Transactional
    public void updateProfile(Profile profile) {
        Profile currProfile = entityManager.find(Profile.class, profile.getId());

        currProfile.setFirstName(profile.getFirstName());
        currProfile.setLastName(profile.getLastName());
        currProfile.setEmail(profile.getEmail());
        currProfile.setPhoneNumber(profile.getPhoneNumber());
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

    public boolean checkProfile(String email, String password) {
        Profile profile = getProfileByEmail(email);
        return profile != null && profile.getPassword().equals(password);
    }

}
