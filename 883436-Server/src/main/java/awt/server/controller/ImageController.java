/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.controller;


import awt.server.dto.ErrorDTO;
import awt.server.dto.ImageDTO;
import awt.server.dto.ImageInfosDTO;
import awt.server.dto.ImageStatisticsDetailsDTO;
import awt.server.dto.ImagesDTO;
import awt.server.exceptions.CampaignNotClosedException;
import awt.server.exceptions.CampaignNotFoundException;
import awt.server.exceptions.CampaignNotReadyException;
import awt.server.exceptions.ImageNotFoundException;
import awt.server.exceptions.NotEmptyFileException;
import awt.server.exceptions.UserNotMasterException;
import awt.server.model.Image;
import awt.server.model.User;
import awt.server.model.convenience.ImageStatisticsDetails;
import awt.server.service.CampaignService;
import awt.server.service.UserService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import awt.server.service.ImageService;
import java.io.InputStream;
import java.net.URI;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@RestController
public class ImageController {
    
    @Autowired
    ImageService imageService;

      @Autowired
    CampaignService campaignService;

    @Autowired
    UserService userService;
    
    /*@RequestMapping(value = "/sid",// method = RequestMethod.GET,
            produces = MediaType.IMAGE_JPEG_VALUE)
    public void getImage(HttpServletResponse response) throws IOException {

        ClassPathResource imgFile = new ClassPathResource("image/sid.jpg");

        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(imgFile.getInputStream(), response.getOutputStream());
    }*/
    
     @RequestMapping(value = "/api/campaign/{campaignId}/freeimage/{imageId}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public void getPublicImage(HttpServletResponse response,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("imageId") Long imageId
            ) throws IOException{

            FileSystemResource imgFile = imageService.getFileSystemResource(campaignId,imageId);
            response.setContentType(MediaType.IMAGE_JPEG_VALUE);
            InputStream is = imgFile.getInputStream();
            try{
                 StreamUtils.copy(is, response.getOutputStream());
            }finally{
                is.close();
            }

    }
    
        @RequestMapping(value = "/api/campaign/{campaignId}/image", method = RequestMethod.POST, consumes = "multipart/form-data") //consumes = MediaType.MULTIPART_FORM_DATA_VALUE)//
        @Transactional
        public ResponseEntity uploadImage(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            //@RequestPart("file") MultipartFile file
           /* @RequestBody*/ @RequestParam("file") MultipartFile file
            //@ModelAttribute("file") UploadedFile uploadedFile
            ){
        try{
            
                User authUser = userService.getUser(APIToken);
               // if(authUser instanceof Master){
                   // if(!uploadedFile.getFile().isEmpty()){
                   if(!file.isEmpty()){
                        //Image i = imageStorageService.store(uploadedFile.getFile(),authUser, campaignId); 
                        Image i = imageService.store(file,authUser, campaignId); 
                        //return ResponseEntity.ok().header("Location", i.getCanonical()).body(null);
                          URI location = new URI("/api/campaign/"+campaignId+"/image/"+i.getId());
                return ResponseEntity.created(location).build();
                    } else throw new NotEmptyFileException();
               // }
               // else throw new UserNotMasterException();
                        
        
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(CampaignNotReadyException|CampaignNotFoundException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
        }

    }
    
     @RequestMapping(value = "/api/campaign/{campaignId}/image/{imageId}", method = RequestMethod.DELETE)
     @Transactional
    public ResponseEntity deleteImage(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("imageId") Long imageId
            ){
        try{
            
                User authUser = userService.getUser(APIToken);
                
                    System.out.println("Cerco di cancellare immagine "+imageId);
                    imageService.deleteImage(authUser, campaignId,imageId);                    
                    return ResponseEntity.ok().body(null);
         
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(ImageNotFoundException e){
            return ResponseEntity.notFound().build();
        }catch(CampaignNotReadyException |CampaignNotFoundException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
        }

    }
    
     @RequestMapping(value = "/api/campaign/{campaignId}/image/{imageId}", method = RequestMethod.GET)
    public ResponseEntity getImageGenericData(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("imageId") Long imageId
            ){
        try{
            
                User authUser = userService.getUser(APIToken);
                Image i = imageService.getImageInfo(authUser, campaignId,imageId);    
                return ResponseEntity.ok().body(new ImageInfosDTO("/api/campaign/"+campaignId+"/image/"+i.getId(),i.getCanonical(),"/api/campaign/"+campaignId+"/image/"+i.getId()+"/statistics"));

        }catch(IOException | URISyntaxException |UserNotMasterException e){
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(ImageNotFoundException e){
            return ResponseEntity.notFound().build();
        }


    }
    // /api/campaign/{id-Campaign}/image/{id-image}/statistics <- stat immagini (annotazioni + selection)
    
    @RequestMapping(value = "/api/campaign/{campaignId}/image/{imageId}/statistics", method = RequestMethod.GET)
    public ResponseEntity getImageStatistics(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId,
            @PathVariable("imageId") Long imageId
            ){
        try{
            
                User authUser = userService.getUser(APIToken);
                
                ImageStatisticsDetails i = imageService.getImageStatisticsDetails(authUser, campaignId,imageId);    
                return ResponseEntity.ok().body(new ImageStatisticsDetailsDTO(i));

        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }catch(ImageNotFoundException |CampaignNotFoundException e){
            return ResponseEntity.notFound().build();
        }catch(CampaignNotClosedException e){
            return ResponseEntity.status(412).body(new ErrorDTO(e.getMessage()));
        }

    }
    
        @RequestMapping(value = "/api/campaign/{campaignId}/image", method = RequestMethod.GET)
    public ResponseEntity getCampaignImages(
            @RequestHeader("Authorization") String APIToken,
            @PathVariable("campaignId") Long campaignId
            ){
        try{
            
                User authUser = userService.getUser(APIToken);
                List<Image> imgs = imageService.getCampaignImages(authUser, campaignId);    
                List<ImageDTO> result = new ArrayList<>();
                if(imgs.isEmpty())
                    return ResponseEntity.ok().body("{\"images\":[]}");
                else {
                    for(Image i: imgs){
                    result.add(new ImageDTO(i.getId(),campaignId,i.getCanonical()));
                    }
                }
                return ResponseEntity.ok().body(new ImagesDTO(result));
     
        }catch(IOException | URISyntaxException |UserNotMasterException e)
        {
             return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }

    }
    
}