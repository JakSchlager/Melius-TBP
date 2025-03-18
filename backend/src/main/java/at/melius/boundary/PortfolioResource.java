package at.melius.boundary;

import at.melius.DTO.ImageUploadDTO;
import at.melius.model.Portfolio;
import at.melius.repository.PortfolioRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

@Path("/portfolio")
public class PortfolioResource {

    @Inject
    PortfolioRepository portfolioRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addPortfolio(Portfolio portfolio) {
        this.portfolioRepository.addPortfolio(portfolio);
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void updatePortfolio(Portfolio portfolio) {
        this.portfolioRepository.updatePortfolio(portfolio);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    @Transactional
    public Portfolio getPortfolio(@PathParam("id") int id) {
        return this.portfolioRepository.getPortfolioById(id);
    }

    @PATCH
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("/{portfolioId}/background")
    public void updatePortfolioBackground(@PathParam("portfolioId")int id, @MultipartForm ImageUploadDTO imageUploadDTO) {
        portfolioRepository.updatePortfolioBackground(id, imageUploadDTO);
    }
}
