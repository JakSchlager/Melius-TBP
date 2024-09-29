package at.melius.repository;

import at.melius.model.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;

import java.util.List;

@ApplicationScoped
public class UserRepository {
    @Inject
    EntityManager entityManager;

    public List<User> getAllProfiles() {
        return this.entityManager.createNamedQuery(User.QUERY_FIND_ALL, User.class).getResultList();
    }

    @Transactional
    public User addProfile(User user) {
        if(getProfileByEmail(user.getEmail()) == null) {
            this.entityManager.persist(user);
            return user;
        }

        throw new BadRequestException();
    }

    @Transactional
    public void updateProfile(User user) {
        User currUser = entityManager.find(User.class, user.getId());

        currUser.setFirstName(user.getFirstName());
        currUser.setLastName(user.getLastName());
        currUser.setEmail(user.getEmail());
        currUser.setPhoneNumber(user.getPhoneNumber());
    }

    public User getProfileByEmail(String email) {
        List<User> users = getAllProfiles();

        for(User currUser : users) {
            if(currUser.getEmail().equals(email)) {
                return currUser;
            }
        }

        return null;
    }

    public boolean checkProfile(String email, String password) {
        User user = getProfileByEmail(email);
        return user != null && user.getPassword().equals(password);
    }

}
