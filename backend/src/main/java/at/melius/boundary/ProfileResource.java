package at.melius.boundary;

import at.melius.DTO.ImageUploadDTO;
import at.melius.DTO.LoginData;
import at.melius.model.FileUploadForm;
import at.melius.model.Profile;
import at.melius.repository.ProfileRepository;
import io.vertx.mutiny.ext.web.multipart.FormDataPart;
import jakarta.inject.Inject;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.Body;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import java.io.File;
import java.io.InputStream;
import java.sql.Blob;
import java.util.List;

@Path("/profile")
public class ProfileResource {

    @Inject
    ProfileRepository profileRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/register")
    @Transactional
    public Profile registerProfile(Profile newProfile) {
        return this.profileRepository.addProfile(newProfile);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    @Transactional
    public Profile loginProfile(LoginData profile) {
        if(this.profileRepository.checkProfile(profile.getEmail(), profile.getPassword())) {
            return this.profileRepository.getProfileByEmail(profile.getEmail());
        }

        throw new NotFoundException();
    }

    @PATCH
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("/img/{id}")
    public void uploadProfileImg(@PathParam("id") int profileId, @MultipartForm ImageUploadDTO form) {
        System.out.println(form);
        profileRepository.saveProfileImg(profileId, form.file);
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public Profile updateProfile(Profile profile) {
        return this.profileRepository.updateProfile(profile);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<Profile> getAllProfiles() {
        return this.profileRepository.getAllProfiles();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/get/{id}")
    @Transactional
    public Profile getProfileById(@PathParam("id") Long id) {
        return this.profileRepository.getProfileById(id);
    }
}
