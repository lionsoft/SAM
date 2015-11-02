using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.OData;
using System.Web.Http.OData.Formatter;
using System.Web.Http.OData.Formatter.Deserialization;
using System.Web.Http.OData.Formatter.Serialization;
using System.Web.Http.Routing;
using Microsoft.AspNet.Identity;
using Microsoft.Data.Edm;
using Microsoft.Data.OData;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;

namespace Sam
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();

            config.Filters.Add(new HostAuthenticationFilter(DefaultAuthenticationTypes.ApplicationCookie));    // Allows use ApplicationCookie authentication on WebApi
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));                // Allows use Bearer authentication on WebApi

            // Return result in browser as JSON
            //config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            config.Formatters.Add(new BrowserJsonFormatter());

            // Разрешить передавать циклические ссылки 
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
            // Трактовать Unspecified дату как локальную (по умолчанию она трактуется как UTC)
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
            // Не передавать названия свойств в JSON-объекте для свойств со значением null
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;

            // Web API routes
//            config.MapHttpAttributeRoutes();
            config.MapHttpAttributeRoutes(new CustomDirectRouteProvider());

            var odataFormatters = ODataMediaTypeFormatters.Create(new JsonODataSerializerProvider(), DefaultODataDeserializerProvider.Instance);
//            var odataFormatters = ODataMediaTypeFormatters.Create(new NullSerializerProvider(), DefaultODataDeserializerProvider.Instance);
            config.Formatters.InsertRange(0, odataFormatters);


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        public class BrowserJsonFormatter : JsonMediaTypeFormatter
        {
            public BrowserJsonFormatter()
            {
                this.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
                this.SerializerSettings.Formatting = Formatting.Indented;
            }

            public override void SetDefaultContentHeaders(Type type, HttpContentHeaders headers, MediaTypeHeaderValue mediaType)
            {
                base.SetDefaultContentHeaders(type, headers, mediaType);
                headers.ContentType = new MediaTypeHeaderValue("application/json");
            }
        }
        public class CustomDirectRouteProvider : DefaultDirectRouteProvider
        {
            protected override IReadOnlyList<IDirectRouteFactory> GetActionRouteFactories(HttpActionDescriptor actionDescriptor)
            {
                // inherit route attributes decorated on base class controller's actions
                return actionDescriptor.GetCustomAttributes<IDirectRouteFactory>(inherit: true);
            }
        }






        public class JsonODataSerializerProvider : DefaultODataSerializerProvider
        {
            public override ODataSerializer GetODataPayloadSerializer(IEdmModel model, Type type, HttpRequestMessage request)
            {
/*
                if (type)
                {
                    // entity type serializer
                    return new CustomEntityTypeSerializer(edmType.AsEntity(), this);
                }
*/
                return base.GetODataPayloadSerializer(model, type, request);
            }
        }
        public class NullEntityTypeSerializer : ODataEntityTypeSerializer
        {
            public NullEntityTypeSerializer(ODataSerializerProvider serializerProvider)
                : base(serializerProvider)
            { }

            public override void WriteObjectInline(object graph, IEdmTypeReference expectedType, ODataWriter writer, ODataSerializerContext writeContext)
            {
                if (graph != null)
                {
                    base.WriteObjectInline(graph, expectedType, writer, writeContext);
                }
            }
        }
        public class NullSerializerProvider : DefaultODataSerializerProvider
        {
            private readonly NullEntityTypeSerializer _nullEntityTypeSerializer;

            public NullSerializerProvider()
            {
                _nullEntityTypeSerializer = new NullEntityTypeSerializer(this);
            }

            public override ODataSerializer GetODataPayloadSerializer(IEdmModel model, Type type, HttpRequestMessage request)
            {
                var serializer = base.GetODataPayloadSerializer(model, type, request);
                if (serializer == null)
                {
                    var functions = model.SchemaElements.Where(s => s.SchemaElementKind == EdmSchemaElementKind.Function);
                    var isFunctionCall = false;
                    foreach (var f in functions)
                    {
                        var fname = string.Format("{0}.{1}", f.Namespace, f.Name);
                        if (request.RequestUri.OriginalString.Contains(fname))
                        {
                            isFunctionCall = true;
                            break;
                        }
                    }

                    // only, if it is not a function call
                    if (!isFunctionCall)
                    {
                        var response = request.GetOwinContext().Response;
                        response.OnSendingHeaders(state =>
                        {
                            ((IOwinResponse)state).StatusCode = (int)HttpStatusCode.NotFound;
                        }, response);
                    }
                    return _nullEntityTypeSerializer;
                }
                return serializer;
            }
        }
    }
}

