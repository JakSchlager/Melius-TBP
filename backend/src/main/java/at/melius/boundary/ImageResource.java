package at.melius.boundary;

import at.melius.DTO.ImageUploadDTO;
import at.melius.repository.ImageRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

@Path("/images")
public class ImageResource {

    @Inject
    ImageRepository imageRepository;


    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("/{portfolioId}")
    public void addToPortfolio(@PathParam("portfolioId")int id, @MultipartForm ImageUploadDTO imageUploadDTO) {
        imageRepository.addToPortfolio(id, imageUploadDTO);
    }

    @DELETE
    @Path("/{id}")
    public void removeImage(@PathParam("id")int id) {
        imageRepository.removeImage(id);
    }

}
