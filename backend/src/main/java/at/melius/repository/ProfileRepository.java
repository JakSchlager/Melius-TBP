package at.melius.repository;

import at.melius.model.GeneralInfo;
import at.melius.model.Profile;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.Blob;
import java.sql.SQLException;
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
    public Profile updateProfile(Profile profile) {
        this.entityManager.merge(profile);
        return profile;
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

    public Profile getProfileById(Long id) {
        return this.entityManager.find(Profile.class, id);
    }

    public void saveProfileImg(int profileId, byte[] fileData) {
        Profile profile = this.entityManager.find(Profile.class, profileId);

        try {
            if(profile.getProfileImage() != null) {
                profile.getProfileImage().free();
            }

            Blob newBlob = new SerialBlob(fileData);
            newBlob.setBytes(1, fileData);

            profile.setProfileImage(newBlob);
            updateProfile(profile);
        } catch(SQLException e) {
            throw new BadRequestException();
        }
    }
}
