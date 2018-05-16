package com.framgia.websocket.config;

import com.framgia.websocket.constants.SecurityConstants;
import com.framgia.websocket.utils.Jwt;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {


    private UserDetailsService userDetailsService;

    public JWTAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {

        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);

        String header = req.getHeader(SecurityConstants.HEADER_STRING);

        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
        if (token != null) {
            // parse the token.
            try {
                token = token.replace(SecurityConstants.TOKEN_PREFIX, "");
                String user = new Jwt().parseDefault(token);
                if (userDetailsService==null){
                    ServletContext servletContext = request.getServletContext();
                    WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
                    userDetailsService = webApplicationContext.getBean(UserDetailsService.class);
                }
                UserDetails userDetails = userDetailsService.loadUserByUsername(user);

                if (user != null) {
                    return new UsernamePasswordAuthenticationToken(user, null, userDetails.getAuthorities());
                }
                return null;
            } catch (Exception ex) {
                ex.printStackTrace();
                return null;
            }
        }
        return null;

    }
}
