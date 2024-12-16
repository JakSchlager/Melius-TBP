package at.melius.model;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import java.sql.Blob;


public class FileUploadForm {
    @PartType(MediaType.APPLICATION_OCTET_STREAM)
    public byte[] file;
}
