/* eslint-disable @typescript-eslint/ban-types */
import { baseApi as api } from './hydro-api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<GetCategoriesApiResponse, GetCategoriesApiArg>({
      query: (queryArg) => ({
        url: `/categories`,
        params: {
          sort: queryArg.sort,
          pagination: queryArg.pagination,
          fields: queryArg.fields,
          populate: queryArg.populate,
          filters: queryArg.filters,
        },
      }),
    }),
    getCategoriesCount: build.query<number, GetCategoriesCountApiArg>({
      query: (queryArg) => ({
        url: `/categories/count`,
        params: {
          filters: queryArg.filters,
        },
        keepUnusedDataFor: 1,
      }),
    }),
    postCategories: build.mutation<
      PostCategoriesApiResponse,
      PostCategoriesApiArg
    >({
      query: (queryArg) => ({
        url: `/categories`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getCategoriesById: build.query<
      GetCategoriesByIdApiResponse,
      GetCategoriesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/categories/${queryArg.id}` }),
    }),
    putCategoriesById: build.mutation<
      PutCategoriesByIdApiResponse,
      PutCategoriesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
    deleteCategoriesById: build.mutation<
      DeleteCategoriesByIdApiResponse,
      DeleteCategoriesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as hydroCategoryApi };
export type GetCategoriesApiResponse = /** status 200 OK */ {
  data?: {
    id: number;
    attributes?: {
      name?: string;
      slug?: string;
      description?: string;
      kind?: 'system' | 'community';
      createdAt?: string;
      updatedAt?: string;
      createdBy?: {
        data?: {
          id: number;
          attributes?: {
            firstname?: string;
            lastname?: string;
            username?: string;
            email?: string;
            resetPasswordToken?: string;
            registrationToken?: string;
            isActive?: boolean;
            roles?: {
              data?: {
                id: number;
                attributes?: {
                  name?: string;
                  code?: string;
                  description?: string;
                  users?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    }[];
                  };
                  permissions?: {
                    data?: {
                      id: number;
                      attributes?: {
                        action?: string;
                        subject?: string;
                        properties?: any;
                        conditions?: any;
                        role?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    };
                  };
                };
              }[];
            };
            blocked?: boolean;
            preferedLanguage?: string;
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id: number;
                attributes?: {};
              };
            };
            updatedBy?: {
              data?: {
                id: number;
                attributes?: {};
              };
            };
          };
        };
      };
      updatedBy?: {
        data?: {
          id: number;
          attributes?: {};
        };
      };
    };
  }[];
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
};
export type GetCategoriesApiArg = {
  /** Sort by attributes ascending (asc) or descending (desc) */
  sort?: string;
  pagination?: {
    withCount?: boolean;
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  /** Fields to return (ex: title,author) */
  fields?: string;
  /** Relations to return */
  populate?: string;
  // where condition
  filters?: Record<string, string>;
};
export type GetCategoriesCountApiArg = {
  // filter condition
  filters?: Record<string, any>;
};
export type PostCategoriesApiResponse = /** status 200 OK */ {
  data?: {
    id: number;
    attributes?: {
      name?: string;
      slug?: string;
      description?: string;
      kind?: 'system' | 'community';
      createdAt?: string;
      updatedAt?: string;
      createdBy?: {
        data?: {
          id: number;
          attributes?: {
            firstname?: string;
            lastname?: string;
            username?: string;
            email?: string;
            resetPasswordToken?: string;
            registrationToken?: string;
            isActive?: boolean;
            roles?: {
              data?: {
                id: number;
                attributes?: {
                  name?: string;
                  code?: string;
                  description?: string;
                  users?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    }[];
                  };
                  permissions?: {
                    data?: {
                      id: number;
                      attributes?: {
                        action?: string;
                        subject?: string;
                        properties?: any;
                        conditions?: any;
                        role?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    };
                  };
                };
              }[];
            };
            blocked?: boolean;
            preferedLanguage?: string;
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id: number;
                attributes?: {};
              };
            };
            updatedBy?: {
              data?: {
                id: number;
                attributes?: {};
              };
            };
          };
        };
      };
      updatedBy?: {
        data?: {
          id: number;
          attributes?: {};
        };
      };
    };
  };
  meta?: object;
};
export type PostCategoriesApiArg = {
  body: {
    data?: {
      name?: string;
      slug?: string;
      kind?: 'system' | 'community';
    };
  };
};
export type GetCategoriesByIdApiResponse = /** status 200 OK */ {
  data?: {
    id: number;
    attributes?: {
      name?: string;
      slug?: string;
      description?: string;
      kind?: 'system' | 'community';
      createdAt?: string;
      updatedAt?: string;
      createdBy?: {
        data?: {
          id: number;
          attributes?: {
            firstname?: string;
            lastname?: string;
            username?: string;
            email?: string;
            resetPasswordToken?: string;
            registrationToken?: string;
            isActive?: boolean;
            roles?: {
              data?: {
                id: number;
                attributes?: {
                  name?: string;
                  code?: string;
                  description?: string;
                  users?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    }[];
                  };
                  permissions?: {
                    data?: {
                      id: number;
                      attributes?: {
                        action?: string;
                        subject?: string;
                        properties?: any;
                        conditions?: any;
                        role?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    };
                  };
                };
              }[];
            };
            blocked?: boolean;
            preferedLanguage?: string;
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id: number;
                attributes?: {};
              };
            };
            updatedBy?: {
              data?: {
                id: number;
                attributes?: {};
              };
            };
          };
        };
      };
      updatedBy?: {
        data?: {
          id: number;
          attributes?: {};
        };
      };
    };
  };
  meta?: object;
};
export type GetCategoriesByIdApiArg = {
  id: number;
};
export type PutCategoriesByIdApiResponse = /** status 200 OK */ {
  data?: {
    id: number;
    attributes?: {
      name?: string;
      slug?: string;
      description?: string;
      kind?: 'system' | 'community';
      createdAt?: string;
      updatedAt?: string;
      createdBy?: {
        data?: {
          id: number;
          attributes?: {
            firstname?: string;
            lastname?: string;
            username?: string;
            email?: string;
            resetPasswordToken?: string;
            registrationToken?: string;
            isActive?: boolean;
            roles?: {
              data?: {
                id: number;
                attributes?: {
                  name?: string;
                  code?: string;
                  description?: string;
                  users?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    }[];
                  };
                  permissions?: {
                    data?: {
                      id: number;
                      attributes?: {
                        action?: string;
                        subject?: string;
                        properties?: any;
                        conditions?: any;
                        role?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id: number;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id: number;
                      attributes?: {};
                    };
                  };
                };
              }[];
            };
            blocked?: boolean;
            preferedLanguage?: string;
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id: number;
                attributes?: {};
              };
            };
            updatedBy?: {
              data?: {
                id: number;
                attributes?: {};
              };
            };
          };
        };
      };
      updatedBy?: {
        data?: {
          id: number;
          attributes?: {};
        };
      };
    };
  };
  meta?: object;
};
export type PutCategoriesByIdApiArg = {
  id: number;
  body: {
    data?: {
      name?: string;
      slug?: string;
      description?: string;
      kind?: 'system' | 'community';
      createdAt?: string;
      updatedAt?: string;
      createdBy?: number | string;
      updatedBy?: number | string;
    };
  };
};
export type DeleteCategoriesByIdApiResponse = /** status 200 OK */ number;
export type DeleteCategoriesByIdApiArg = {
  id: number;
};
export const {
  useGetCategoriesQuery,
  useGetCategoriesCountQuery,
  usePostCategoriesMutation,
  useGetCategoriesByIdQuery,
  usePutCategoriesByIdMutation,
  useDeleteCategoriesByIdMutation,
} = injectedRtkApi;
