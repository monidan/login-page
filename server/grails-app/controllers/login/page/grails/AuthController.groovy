package login.page.grails

import groovy.transform.CompileStatic
import grails.rest.*
import grails.converters.*
import groovy.xml.*

// @CompileStatic
class AuthController{
	static responseFormats = ['xml', 'json']
	
    def index() {
        renderXML()
    }

    def save() {
        renderXML()
    }

    def show() {
        renderXML()
    }

    private void renderXML() {
        def users = User.list()
        def response = new XmlSlurper().parse(request.reader.text)

        

        render ([respond: response.user.login])
    }
}
