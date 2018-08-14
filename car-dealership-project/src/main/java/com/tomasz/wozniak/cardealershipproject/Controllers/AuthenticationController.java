package com.tomasz.wozniak.cardealershipproject.Controllers;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping()
public class AuthenticationController {

  private static final Logger logger = Logger.getLogger(AuthenticationController.class);

  @RequestMapping("/logoutSuccess")
  public void logoutSuccess() {
    logger.debug("you have been logged out successfully");
  }

  @RequestMapping("/user")
  public Principal user(Principal user) {
    logger.debug("User: " + user.getName() + " authenticated.");
    return user;
  }
}
